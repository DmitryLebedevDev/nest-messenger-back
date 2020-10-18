interface Constructable<T> {
  new(...args: any): T;
}

export function createDto<T>(dataForDto, ConstructorDto: Constructable<T>): T {
  const instanceDto = new ConstructorDto();
  return Object.assign(instanceDto, dataForDto);
}