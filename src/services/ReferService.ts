import { ReferModel } from "../db/ReferModel";

export const getAllRefers = () => ReferModel.find();
export const findReferById = (id: string) => ReferModel.findById(id);
export const createRefer = (values: Record<string, any>) => new ReferModel(values).save().then((refer) => refer.toObject());
export const updateRefer = (id: string, values: Record<string, any>) => ReferModel.findByIdAndUpdate(id, values, { new: true });
export const deleteReferById = (id: string) => ReferModel.findByIdAndDelete(id);
