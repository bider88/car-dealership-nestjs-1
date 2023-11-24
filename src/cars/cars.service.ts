import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CarInterface } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: CarInterface[] = [
    {
      id: uuid(),
      brand: 'Volkswagen',
      model: 'Jetta'
    },
    {
      id: uuid(),
      brand: 'Audi',
      model: 'A3'
    },
    {
      id: uuid(),
      brand: 'Porshe',
      model: 'Cayenne'
    }
  ];

  findAll(): CarInterface[] {
    return this.cars;
  }

  findOneById(id: string): CarInterface {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  createOne(createCar: CreateCarDto) {
    const car: CarInterface = {
      id: uuid(),
      ...createCar
    };
    this.cars.push(car);
    return this.findOneById(car.id);
  }

  updateOne(id: string, updateCar: UpdateCarDto) {
    let carDB = this.findOneById(id);
    if (updateCar.id && updateCar.id !== id) {
      throw new BadRequestException('Car id is not equal inside body');
    }
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCar,
          id
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  deleteOne(id: string) {
    const carDB = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== carDB.id);
    return carDB;
  }
}
