export enum ServiceType {
  Controlling = 0,
  Executive,
}

const serviceTypes: { [property: string]: string } = {
  0: "Контролирующий",
  1: "Исполнительный",
};

export default serviceTypes;
