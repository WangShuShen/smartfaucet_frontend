#!/bin/bash

# Function to capitalize the first letter
capitalize_first_letter() {
    echo "$1" | sed 's/./\U&/'
}

# Function to create a component
create_component() {
    local component_path=$1
    local component_name=$(capitalize_first_letter "$2")
    local need_service=$3

    # Create component file
    echo "import React from 'react';

export default function ${component_name}_Component() {
    return (
        <div>
         ${component_name}
        </div>
    );
}" > "${component_path}/${component_name}_component.tsx"

    # Create service directory and file if needed
    if [ "$need_service" = "yes" ]; then
        mkdir -p "${component_path}/service"
        touch "${component_path}/service/${component_name}_hooks.tsx"
    fi
}

# Start of the script
echo "Enter the name of the page:"
read page_name

# Create the main directory
mkdir -p "${page_name}"
cd "${page_name}"

page_name=$(capitalize_first_letter "$page_name")

# Ask for the number of segments
echo "How many segments?"
read segment_count

# Variables to hold segment imports and instances for page.tsx
page_imports=""
page_segments=""

# For each segment
i=1
while [ $i -le $segment_count ]
do
    echo "Enter name for segment $i:"
    read segment_name
    segment_name=$(capitalize_first_letter "$segment_name")

    # Add segment import and instance to the page file
    page_imports="${page_imports}import ${segment_name}_Segment from './${segment_name}_segment/${segment_name}_segment';\n"
    page_segments="${page_segments}<${segment_name}_Segment />\n"

    mkdir -p "${segment_name}_segment"
    cd "${segment_name}_segment"

    # Ask for the number of components in this segment
    echo "How many components in ${segment_name}_segment?"
    read component_count

    # Initialize variables for segment file content
    segment_imports=""
    segment_components=""

    # For each component
    j=1
    while [ $j -le $component_count ]
    do
        echo "Enter name for component $j:"
        read component_name
        component_name=$(capitalize_first_letter "$component_name")

        # Prepare content for the segment file
        segment_imports="${segment_imports}import ${component_name} from './${component_name}_component/${component_name}_component';\n"
        segment_components="${segment_components}<${component_name} />\n"

        echo "Does ${component_name} need a service folder? (yes/no)"
        read need_service
        mkdir -p "${component_name}_component"
        create_component "${component_name}_component" "${component_name}" "$need_service"

        j=$((j + 1))
    done

    # Create the segment file
    echo "\"use client\";
import React from 'react';
${segment_imports}

export default function ${segment_name}_Segment() {
    return (
        <div className='flex'>
            ${segment_components}
        </div>
    );
}" > "${segment_name}_segment.tsx"

    # Return to the main directory
    cd ..

    i=$((i + 1))
done

# Create the page.tsx file
echo "\"use client\";
import React from 'react';
${page_imports}

export default function ${page_name}_Page() {
    return (
        <div className='block'>
            ${page_segments}
        </div>
    );
}" > "page.tsx"

echo "Script execution completed. The directory structure has been set up."
