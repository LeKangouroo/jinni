export default {

  patterns: {

    "common": [
      {
        match: "CACHE_BUST",
        replacement: Date.now()
      }
    ],
    "development": [
      {
        match: "ENV",
        replacement: "DEV"
      },
      {
        match: "GOOGLE_ANALYTICS_ID",
        replacement: "XXX"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      }
    ],
    "pre-production": [
      {
        match: "ENV",
        replacement: "PRE-PRODUCTION"
      },
      {
        match: "GOOGLE_ANALYTICS_ID",
        replacement: "XXX"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      }
    ],
    "production": [
      {
        match: "ENV",
        replacement: "PRODUCTION"
      },
      {
        match: "GOOGLE_ANALYTICS_ID",
        replacement: "XXX"
      },
      {
        match: "HTTP_ROOT_DIR",
        replacement: ""
      }
    ]
  }
};
