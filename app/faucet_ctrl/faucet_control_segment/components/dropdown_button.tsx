// components/dropdown_button.tsx
import React,{ useState } from 'react';
import { Listbox } from '@headlessui/react';
interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownButtonProps {
  options: DropdownOption[];
}

export default function DropdownButton({ options }: DropdownButtonProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="px-0 py-0.5 md:px-0 md:py-0.5 w-auto md:max-w-[6.25rem] mx-auto">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-1 pl-2 pr-5 text-left bg-white rounded-full text-stone-600 font-bold border border-zinc-400 cursor-default focus:outline-none focus:ring-2 focus:ring-sky-500 text-xxxs md:text-xxs">
              {selectedOption.label}
              <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                <svg className="w-4 h-4 text-stone-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 10l5 5 5-5H5z" />
                </svg>
              </span>
            </Listbox.Button>
            {open && (
              <Listbox.Options className="absolute w-full py-0.5 mt-1 overflow-auto text-xxxs md:text-xxs bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `cursor-default select-none relative py-1 pl-6 pr-2 ${
                        active ? 'text-stone-800 bg-sky-100' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-sky-600">
                            <svg className="w-3 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-7.293 7.293a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L9 12.585l6.293-6.292a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>
    </div>
  );
}
