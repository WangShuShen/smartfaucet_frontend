/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import AnimatedLink from "./animations/AnimatedUnderlineLink";
import AnimatedMenu from "./animations/AnimatedMenu";
import AnimatedAccountSetting from "./animations/AnimatedAccountSetting";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "./service/Logout_hook";
import { createApiClient } from "@/utils/apiClient";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
async function fetchSelfAPI() {
  try {
    const apiUrl = "member/SelfManager/retrieve";
    const postApiClient = createApiClient("post", apiUrl);

    const payload = {};
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function fetchSelfProfileAPI() {
  try {
    const apiUrl = "member/SelfManager/picture";
    const getApiClient = createApiClient("get", apiUrl);
    const response = await getApiClient(apiUrl, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const lang = useLang();
  const languageData = useLanguage("layout", lang);

  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    const response = await fetchSelfAPI();
    const profile_response = await fetchSelfProfileAPI();
    setProfile(profile_response);
    setUseremail(response.email);
    setRole(response.role);
  }
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const result = await logout(refreshToken);

      if (
        result.success === false &&
        (result.status === 400 || result.status === 401)
      ) {
        router.push("/login");
      } else {
        router.push("/login");
      }
    } catch (error) {
      alert(error.message);
      router.push("/login");
    }
  };
  if (!languageData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <nav className="navbar-bg-gradient shadow-lg relative z-20 w-full ">
        <div className="flex justify-between items-center h-full px-4 w-full">
          <div className="flex items-center">
            <button
              className="outline-none mobile-menu-button mx-2"
              onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            >
              <img
                className="w-full xs:h-6 sm:h-6 md:h-8 lg:h-8"
                src="/Navbar/hamburger_icon.svg"
                alt="hamburger_icon"
              />
            </button>
            <Link href="/project_setting">
              <button className="outline-none mobile-menu-button mx-2">
                <img
                  className="w-auto xs:h-10 sm:h-8 md:h-12 lg:h-12"
                  src="/Navbar/home_icon.svg"
                  alt="home_icon"
                />
              </button>
            </Link>
            {/* Website Logo */}
            <Link href="/project_setting">
              <button className="flex items-center py-4 px-4">
                <img
                  className="w-auto xs:h-8 sm:h-8 md:h-12 lg:h-12"
                  src="/Navbar/logo.svg"
                  alt="logo"
                />
              </button>
            </Link>
          </div>

          <div className="relative flex items-center">
            <img
              src={profile || "/member_setting/default_profile.svg"}
              alt="Profile"
              className="rounded-full mr-2"
              style={{ width: "50px", height: "50px" }}
            />
            <span className="text-xs text-white font-bold mr-2">
              Hi,{useremail}
            </span>
            <button
              className="btn bg-sky-200 hover:bg-sky-600 px-4 py-2 rounded-full font-bold z-10 w-24 lg:text-lg md:text-md sm:text-sm xs:text-xs"
              onClick={handleLogout}
            >
              {languageData.logout}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatedMenu isOpen={isOpen}>
          <div className="my-20 overflow-y-auto max-h-200">
            <AnimatedLink href="/project_setting">
              {languageData.project_setting}
            </AnimatedLink>
            <AnimatedLink href="/water_carbon_data">
              {languageData.water_carbon_data}
            </AnimatedLink>
            {role === "manager" && (
              <AnimatedLink href="/member_setting">
                {languageData.member_setting}
              </AnimatedLink>
            )}
            <AnimatedLink href="/account_setting">
              {languageData.account_setting}
            </AnimatedLink>
          </div>
        </AnimatedMenu>
      </nav>
    </>
  );
};

export default Navbar;
