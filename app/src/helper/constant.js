export const pl = process.env.REACT_APP_ENV;
// export const BASE_URL = process.env.REACT_APP_API_URL;
export const ISLOCAL = !!window.localStorage.isLocal;
export const BASE_URL = 1 ?
    'http://localhost/evergreenadmin/api' :
    'https://memberapp-api.apps.openxcell.dev/api';


export const SECONDARY_COLOR = "#C33FD9";
// export const SECONDARY_COLOR = '#c33ed7'
// export const DARK_RED = '#a20404'
// export const HEADER_COLOR = '#E10001'
export const HEADER_COLOR = "#5b2166";
// export const HEADER_COLOR = '#153BF6'
export const FOOTER_COLOR = "#6f0404";
// export const FOOTER_COLOR = '#020D40'
export const SITE_NAME = "EVERGREEN";
export const SITE_SHORT_DESC = "CULTIVATE MEMBERSHIP GROWTH";
export const BUTTON_COLOR = "#E10001";
// export const BUTTON_COLOR = '#34BEBF'
export const WEBSITE_URL = 'http://localhost:3000/'
// export const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL;
export const APP_STORE_LINK =
    "https://apps.apple.com/us/app/evergreen-member-management/id1532083835";

export const GOOGLE_MAP_KEY = "AIzaSyBDfLUrq9BAh_3fr8PKlSf2OE1tNC26kA0";

export const PAGE_ID = {
    aboutUs: 1,
    help: 2,
    privacyPolicy: 3,
    terms: 4,
    contactus: 5
};

export const REGISTER_TYPE = {
    normal: "Normal",
    google: "Google",
    facebook: "Facebook",
};

// This navbar will be added in main header after successful login
// Path is used to highlight the active link/page

export const LOGIN_HEADER = [
    {
        label: "Home",
        path: "/home",
    },
    {
        label: "Benefits",
        path: "/benefits",
    },
    {
        label: "Dues",
        path: "/dues",
    },
    {
        label: "Referrals",
        path: "/referrals",
    },
    {
        label: "Resources",
        path: "/resources",
    },
    {
        label: "Inbox",
        path: "/inbox",
    },
    {
        label: "Advocacy",
        path: "/advocacy",
    },
    {
        label: "Events",
        path: "/events",
    },
    {
        label: "Careers",
        path: "/careers",
    },
    {
        label: "Store",
        path: "/store",
    },
    // {
    //   label: 'About Us',
    //   path: '/about_us',
    // },
];

export const TYPE_ID = {
    prefix: 1,
    suffix: 2,
    industry: 3,
    occupation: 4,
    university: 5,
    degree: 6,
    certification: 7,
    expertise: 8,
    salaryRange: 9,
    houseHold: 10,
    phoneCode: 11,
    country: 12,
};

export const PROFILE_OPTIONS = {
    prefix: [
        { label: "Mr.", value: 2933 },
        { label: "Mrs.", value: 2934 },
        { label: "Dr.", value: 2935 },
        { label: "Ms.", value: 2936 },
    ],
    suffix: [
        { label: "Jr.", value: 2937 },
        { label: "Sr.", value: 2938 },
        { label: "II", value: 2939 },
        { label: "III", value: 2940 },
        { label: "IV", value: 3474 },
    ],
    degree: [
        { label: "Associate's degree", value: 2941 },
        { label: "Bachelor's degree", value: 2942 },
        { label: "Master's degree", value: 2943 },
        { label: "Doctoral Degree", value: 2944 },
        { label: "Profesional degree", value: 2945 },
    ],
    expertise: [
        { label: "Analytical", value: 2959 },
        { label: "Communication", value: 2960 },
        { label: "Computer", value: 2961 },
        { label: "Conceptual", value: 2962 },
        { label: "Core Competencies", value: 2963 },
        { label: "Creative Thinking", value: 2964 },
        { label: "Critical Thinking", value: 2965 },
    ],
    salaryRange: [
        { label: "No income", value: 2966 },
        { label: "0 - $40,000", value: 2967 },
        { label: "$40,001 to $80,000", value: 2968 },
        { label: "$80,001 to $120,000", value: 2969 },
        { label: "$120,001 to $160,000", value: 2970 },
        { label: "$160,001 to $200,000", value: 3471 },
        { label: "$200,000 to $240,000", value: 3472 },
        { label: "$240,000+", value: 3473 },
    ],
    houseHold: [
        { label: "Single", value: 2971 },
        { label: "Single with children", value: 2972 },
        { label: "Married", value: 2973 },
        { label: "Married with children", value: 2974 },
        { label: "Widowed", value: 3469 },
        { label: "Widowed with children", value: 3470 },
    ],
};

export const MONTH = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

// DO not change the order of 'all' element in the array. Make it the 1st element
export const BENEFIT_LOCATION = [
    {
        label: "All",
        value: "AllBenefits",
    },
    {
        label: "National",
        value: "National",
    },
    {
        label: "Regional",
        value: "Regional",
    },
    {
        label: "State",
        value: "State",
    },
    {
        label: "Section",
        value: "Section",
    },
];

export const EVENT_LOCATION = [
    {
        label: "All",
        value: "AllEvents",
    },
    {
        label: "National",
        value: "National",
    },
    {
        label: "Regional",
        value: "Regional",
    },
    {
        label: "State",
        value: "State",
    },
    {
        label: "Section",
        value: "Section",
    },
];

export const ADVOCACY_LOCATION = [
    {
        label: "All",
        value: "AllAdvocacy",
    },
    {
        label: "National",
        value: "National",
    },
    {
        label: "Regional",
        value: "Regional",
    },
    {
        label: "State",
        value: "State",
    },
    {
        label: "Section",
        value: "Section",
    },
];

export const NEWS_LOCATION = [
    {
        label: "National",
        value: "National",
    },
    {
        label: "Regional",
        value: "Regional",
    },
    {
        label: "State",
        value: "State",
    },
    {
        label: "Section",
        value: "Section",
    },
];

export const RECOMMENDATION_LETTER = BASE_URL + "/member/?method=recommendation-letter";

export const WEPAY_APP_ID = "739963";
export const WEPAY_VERSION = "3.0";
export const WEPAY_ENV = process.env.REACT_APP_WEPAY_ENV;
export const COUNTRY_CODE = [
    {
        label: "United States",
        phoneCode: "+1",
        countryCode: "US",
    },
    {
        label: "Canada",
        phoneCode: "+1",
        countryCode: "CA",
    },
];

export function getApiURL() {
    // if (window.localStorage.isLocal) {
    return 'http://localhost/evergreenadmin/api';
    // } else {
    //   return 'https://memberapp-api.apps.openxcell.dev/api';
    // }
}