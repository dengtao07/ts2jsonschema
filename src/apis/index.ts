// Api1
interface IApi1 {
  name: string;
  age: number;
  hobby: string[];
}

const Api1: () => Promise<IApi1> = async () => {
  return Promise.resolve({
    name: 'test',
    age: 1,
    hobby: ['coding']
  });
}

// Api2
interface IApi2 {
  id: string;
  job: string;
}

const Api2 = async () => {
  return Promise.resolve({
    job: 12311312
  });
}

export {
  Api1,
  Api2
}