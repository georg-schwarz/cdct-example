interface Config {
  BACKEND_URL: string;
}

export const CONFIG: Config = {
  BACKEND_URL: getEnvStringOrThrow('REACT_APP_BACKEND_URL'),
};

function getEnvString(name: string): string | undefined {
  return process.env[name];
}

function getEnvStringOrThrow(name: string): string {
  const variable = getEnvString(name);

  if (variable === undefined) {
    throw Error(`Unable to get the environment variable "${name}".`);
  }

  return variable;
}
