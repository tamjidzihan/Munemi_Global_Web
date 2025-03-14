import { OfferModel } from "../db/OfferModel";

export const getOffers = () => OfferModel.find();
export const findOfferById = (id: string) => OfferModel.findById(id);
export const createOffer = (values: Record<string, any>) => new OfferModel(values).save().then((offer) => offer.toObject());
export const updateOffer = (id: string, values: Record<string, any>) => OfferModel.findByIdAndUpdate(id, values, { new: true });
export const deleteOfferById = (id: string) => OfferModel.findByIdAndDelete(id);
