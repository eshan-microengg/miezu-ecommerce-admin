export const BASE_URL = "https://api.miezualkalineionizer.com/api/";
// export const BASE_URL = "http://localhost:3002/api/";

export const NAVBAR = {
  BRAND_IMAGE: "/assets/miezu.webp",
  PROFILE_NAME: "Profile",
  PROFILE_OPTION: "Logout",
};

export const HOME_SIDEBAR = [
  {
    title: "Pages",
    items: [
      { ID: "1", LABEL: "HomePage", ROUTE: "/homepage" },
      { ID: "2", LABEL: "About Us", ROUTE: "/about-us" },
      { ID: "3", LABEL: "Water Type", ROUTE: "/water-type" },
      { ID: "4", LABEL: "FAQs", ROUTE: "/faq" },
      { ID: "5", LABEL: "Contact Us", ROUTE: "/contact-us" },
      { ID: "6", LABEL: "Miscellaneous ", ROUTE: "/others" },
    ],
  },
  {
    title: "Master",
    items: [
      { ID: "7", LABEL: "Products", ROUTE: "/products" },
      { ID: "8", LABEL: "Employee", ROUTE: "/employee" },
      { ID: "9", LABEL: "Booked Demo(s)", ROUTE: "/demo" },
      { ID: "10", LABEL: "Coupons", ROUTE: "/coupons" },
      { ID: "11", LABEL: "Blogs", ROUTE: "/blogs" },
      { ID: "12", LABEL: "Testimonial", ROUTE: "/testimonial" },
    ],
  },
  {
    title: "Sales",
    items: [
      { ID: "13", LABEL: "Orders", ROUTE: "/orders" },
      { ID: "14", LABEL: "Reviews & Ratings", ROUTE: "/reviews-and-ratings" },
    ],
  },
  // {
  //   title: "Customer",
  //   items: [{ ID: "9", LABEL: "Testimonial", ROUTE: "/testimonial" }],
  // }
];

export const HOME_PAGE = {};

export const LOGIN_PAGE = {
  HEADING: "Welcome Back",
  SUB_HEADING: "Login to Admin Panel",
  BRAND_IMAGE: "./assets/miezu.webp",
  LOGIN_FORM: {
    USERNAME: {
      // VALUE: "",
      LABEL: "Email",
    },
    PASSWORD: {
      // VALUE: "",
      LABEL: "Password",
    },
    BUTTON: {
      NAME: "Log In",
      LINK: "/products",
    },
  },
};

export const META = {
  TITLE: "SEO Meta",
  SLUG_URL: {
    LABEL: "Slug URL",
  },
  M_TITLE: {
    LABEL: "Meta Title",
  },
  DESC: {
    LABEL: "Meta Description",
  },
  KEYWORDS: {
    LABEL: "Meta Keywords",
  },
};

export const ADD_PRODUCT_DETAILS = {
  TITLE: "Employee Information ",
  PRODUCT_NAME: {
    LABEL: "Product Title",
  },
  PRICE: {
    LABEL: "Price",
  },
  DESC: {
    LABEL: "Short Description",
  },
  MODELS: {
    TITLE: "Model",
    OPTIONS: [
      {
        VALUE: "Carbon VOC Filter",
        LABEL: "Carbon VOC Filter",
      },
      {
        VALUE: "Alkaline Mineral Boost VOC Filter",
        LABEL: "Alkaline Mineral Boost VOC Filter",
      },
    ],
  },
  IS_NEW_ARRIVAL: {
    LABEL: "Is New Arrival ?",
  },
  IS_TRENDING_NOW: {
    LABEL: "Is Trending Now ?",
  },
  IS_ON_SALE: {
    LABEL: "Is On Sale ?",
  },
  IS_PUBLISHED: {
    LABEL: "Is Published ?",
  },
};

export const PRODUCT_DESCRIPTION = {
  TITLE: "Product Description",
};
export const IMAGES = {
  TITLE: "Images",
};

export const DYNAMIC_HOMEPAGE = {
  META: {
    HEADER: "SEO Meta",
    DATA: [
      {
        ROW: "Slug URL",
      },
      {
        ROW: "Meta Title",
      },
      {
        ROW: "Meta Description",
      },
      {
        ROW: "Meta Keywords",
      },
    ],
  },
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Bg Image",
      },
      {
        ROW: "Action",
      },
    ],
  },

  ALKALINE_WATER_BENEFITSS: {
    DATA: [
      {
        ROW: "heading",
      },
      {
        ROW: "image",
      },
    ],
  },

  ALKALINE_WATER_BENEFITS: {
    HEADER: "Alkaline Water Benefits",
    DATA: [
      {
        ROW: "Benefits",
      },
      {
        ROW: "Alkaline Water",
      },
      {
        ROW: "Normal Water",
      },
      {
        ROW: "Action",
      },
    ],
  },
  MEIZU_BENEFITS: {
    HEADER: "Meizu Product Benefits",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Image",
      },
    ],
  },

  MEIZU_BENEFITSS: {
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Action",
      },
    ],
  },

  VIDEO: {
    HEADER: "Video",
    DATA: [
      {
        ROW: "Video Link",
      },
    ],
  },
  QUICK_SERVICES: {
    HEADER: "Quick Services",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Video",
      },
      {
        ROW: "Action",
      },
    ],
  },
};

export const DYNAMIC_ABOUTUS_PAGE = {
  META: {
    HEADER: "SEO Meta",
    DATA: [
      {
        ROW: "Slug URL",
      },
      {
        ROW: "Meta Title",
      },
      {
        ROW: "Meta Description",
      },
      {
        ROW: "Meta Keywords",
      },
    ],
  },
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Bg Image",
      },
      {
        ROW: "Action",
      },
    ],
  },
  INFO: {
    HEADER: "Information",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
    ],
  },
  OUR_FOUNDERS: {
    HEADER: "Our Founders",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Founder Name",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Role",
      },
      {
        ROW: "Action",
      },
    ],
  },
  MOTTO: {
    HEADER: "Company's Motto",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Action",
      },
    ],
  },
  CORE_PRINCIPLES: {
    HEADER: "Core Principles",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Title",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Action",
      },
    ],
  },
};
export const OTHER = {
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Bg Image",
      },
      {
        ROW: "Action",
      },
    ],
  },
};

export const DYNAMIC_SOLUTION_PAGE = {
  META: {
    HEADER: "SEO Meta",
    DATA: [
      {
        ROW: "Slug URL",
      },
      {
        ROW: "Meta Title",
      },
      {
        ROW: "Meta Description",
      },
      {
        ROW: "Meta Keywords",
      },
    ],
  },
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Bg Image",
      },
    ],
  },
  FAQ: {
    HEADER: "FAQs",
    DATA: [
      {
        ROW: "Question",
      },
      {
        ROW: "Answer",
      },
      {
        ROW: "Action",
      },
    ],
  },
};

export const DYNAMIC_WATERTYPE_PAGE = {
  META: {
    HEADER: "SEO Meta",
    DATA: [
      {
        ROW: "Slug URL",
      },
      {
        ROW: "Meta Title",
      },
      {
        ROW: "Meta Description",
      },
      {
        ROW: "Meta Keywords",
      },
    ],
  },
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Image",
      },
    ],
  },
  WATER_TYPES: {
    HEADER: "Water Types",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Title",
      },
      {
        ROW: "Sub Title",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Call To Action",
      },
      {
        ROW: "Action",
      },
    ],
  },
  WATER_PH_SCALE: {
    HEADER: "Water PH Scale",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Title",
      },
      {
        ROW: "Sub Title",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Action",
      },
    ],
  },
  HEALTH_BENEFITS: {
    HEADER: "Health Benefits",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Description",
      },
      {
        ROW: "Title",
      },
      {
        ROW: "Sub Title",
      },
      {
        ROW: "Image",
      },
      {
        ROW: "Action",
      },
    ],
  },
};

export const DYNAMIC_CONTACTUS_PAGE = {
  META: {
    HEADER: "SEO Meta",
    DATA: [
      {
        ROW: "Slug URL",
      },
      {
        ROW: "Meta Title",
      },
      {
        ROW: "Meta Description",
      },
      {
        ROW: "Meta Keywords",
      },
    ],
  },
  BANNER: {
    HEADER: "Banner",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
    ],
  },
  CONTACT: {
    HEADER: "Contact Details",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Contact No.",
      },
      {
        ROW: "Email",
      },
      {
        ROW: "Address",
      },
    ],
  },
  SOCIAL_NETWORKS: {
    HEADER: "Social Networks",
    DATA: [
      {
        ROW: "Heading",
      },
      {
        ROW: "Sub Heading",
      },
      {
        ROW: "Platform",
      },
      {
        ROW: "Call To Action",
      },
      {
        ROW: "Action",
      },
    ],
  },
};
