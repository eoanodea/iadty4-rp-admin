type IConfig = {
  [key: string]: any;
  env: string;
  server_url: string;
};

export const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  server_url: process.env.REACT_APP_SERVER_URL || "http://localhost:3000",
  ga_id: process.env.REACT_APP_GOOGLE_ANALYTICS,
};
