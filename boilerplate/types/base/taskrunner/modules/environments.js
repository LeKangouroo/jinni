import { development, preproduction, production } from "../config/common/environments.js";

export function getEnvironmentVariables(env)
{
  switch (env)
  {
    case "production":
      return production;
    case "preproduction":
      return preproduction;
    default:
      return development;
  }
}
