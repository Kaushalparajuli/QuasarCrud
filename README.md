Quasar App Extension quasar-crud-kaushal
===
To use quasar-crud-kaushal in your Quasar project, follow these steps:

### 1. Installing package in project
```angular2html
yarn add https://github.com/Kaushalparajuli/QuasarCrud.git
```

## Dependencies

This project relies on the following dependencies:

	•	@vitejs/plugin-vue - Vue.js plugin for Vite.
	•	axios - Promise-based HTTP client.
	•	lodash - Utility library for JavaScript.
	•	moment - Library for parsing, validating, manipulating, and formatting dates.
	•	quasar - Quasar Framework.
	•	vite-plugin-tailwind - Tailwind CSS integration for Vite.

DevDependencies

	•	autoprefixer - PostCSS plugin to parse CSS and add vendor prefixes.
	•	postcss - Tool for transforming CSS with JavaScript.
	•	tailwindcss - Utility-first CSS framework.

Usage

To use the quasar-crud-kaushal in your Quasar project:

	1.	Import the necessary components and utilities from the extension.
	2.	Customize the CRUD operations according to your project’s requirements.
	3.	Leverage the provided components to manage data in your Quasar application.

## Dependencies install

### 1. Tailwind css
```
npm install -D tailwindcss
npx tailwindcss init
```

#### Copy paste in  - tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix:'tw-',
    content: [
        'index.html',
        './node_modules/quasar-crud-kaushal/**/*.{vue,js,ts,jsx,tsx}',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: []
}

```

#### Copy paste in  - /src/css/app.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```



## 5. Copy paste this code to /src/boot/axios.js

```javascript
import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";
import { cachedRoute } from "boot/cacheRoute";
import { LocalStorage } from "quasar";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: "Bearer " + LocalStorage.getItem("access_token"),
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const checkIndex = cachedRoute.findIndex((elem) => elem.url === config.url);
  if (checkIndex > -1) {
    var data = LocalStorage.getItem(cachedRoute[checkIndex].name);
    if (data) {
      var parseData = data;
      var now = new Date();
      var expiry = new Date(parseData.expiry);
      if (expiry > now) {
        config.adapter = function (config) {
          return new Promise((resolve, reject) => {
            const res = {
              data: parseData.data,
              status: 200,
              statusText: "OK",
              headers: {},
              config: config,
              request: {},
            };
            return resolve(res);
          });
        };
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    const checkIndex = cachedRoute.findIndex(
      (elem) => elem.url === response.config.url
    );
    if (checkIndex > -1) {
      var date = new Date();
      var expiry = date.setHours(
        date.getHours() + cachedRoute[checkIndex].duration ?? 0
      );
      LocalStorage.set(cachedRoute[checkIndex].name, {
        name: cachedRoute[checkIndex].name,
        expiry,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("intercept", error.response.data.error);
      Notify.create({
        message: error?.response?.data?.error,
        color: "negative",
        position: "top-right",
      });
      LocalStorage.remove("access_token");
      window.location.href = "/login";
    } else if (error.response.status === 422) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    } else if (error.response.status === 401) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
      LocalStorage.remove("access_token");
    } else if (error.response.status === 400) {
      console.log("error 400");
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    } else if (error.response.status === 500) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axios };

```

## 5. Copy paste this code to /src/boot/cacheRoute.js
> This file is required for caching route. you can add apu slug for cache route
```javascript
// NOTE: duration should be in hours
export const cachedRoute = [
  {
    name: "meta_data",
    url: "central/user/meta-data",
    duration: 24, // hrs
  },
];

```

## Add icons in quasar.conf.js
```javascript
extras: [
'mdi-v7',
'eva-icons',
]
```

## Add api base path in .env
```
VITE_API_URL=http://localhost:8000/api/
```

# Usage of this plugin
Copy paste this code to scripts of  package.json file of your project
```
"scripts":{
    "generate-crud":"node node_modules/quasar-crud-kaushal/commands/createCrud.cjs"
}
```
To generate crud please type 
```
npm run generate-crud <storename : ex: kaushal> <api path : ex: kaushal> <route path : ex: kaushal>
```


