import motorcycleModel from "../models/motorcycle.model.js"
import {HttpException} from '../exceptions/exceptions.js';

export async function save(motorcycleData){
    const motorcycle = await motorcycleModel.create({...motorcycleData})
    return {motorcycle}
}