import { BrandsService } from './../brands/brands.service';
import { CarsService } from './../cars/cars.service';
import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) {}

  populateDb() {
    this.carsService.fillCarsFromSeedData(CARS_SEED);
    this.brandsService.fillBrandsFromSeedData(BRANDS_SEED);
    return 'Seed executed successfully';
  }
}
