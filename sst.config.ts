/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    const isProduction = input?.stage === "production";

    return {
      name: "react-router-7-app",
      removal: isProduction ? "retain" : "remove",
      protect: isProduction,
      home: "aws",
      providers: {
        aws: {
          profile: process.env.GITHUB_ACTIONS
            ? undefined
            : isProduction
            ? "kyroslabs-production"
            : "kyroslabs-development",
          region: "eu-central-1",
        },
      },
    };
  },
  async run() {
    new sst.aws.React("MyWeb");
  },
});
