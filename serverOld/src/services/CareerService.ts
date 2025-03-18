import { CareerModel } from "../db/CareerModel";

export const getCareers = () => CareerModel.find();
export const findCareerById = (id: string) => CareerModel.findById(id);
export const createCareer = (values: Record<string, any>) => new CareerModel(values).save().then((career) => career.toObject());
export const updateCareer = (id: string, values: Record<string, any>) => CareerModel.findByIdAndUpdate(id, values, { new: true });
export const deleteCareerById = (id: string) => CareerModel.findByIdAndDelete(id);