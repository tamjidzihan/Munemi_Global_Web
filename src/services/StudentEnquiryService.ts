import { StudentEnquiryModel } from "../db/StudentEnquiryModel";

export const getStudentEnquiries = () => StudentEnquiryModel.find();
export const findStudentEnquiryById = (id: string) => StudentEnquiryModel.findById(id);
export const createStudentEnquiry = (values: Record<string, any>) => new StudentEnquiryModel(values).save().then((enquiry) => enquiry.toObject());
export const updateStudentEnquiry = (id: string, values: Record<string, any>) => StudentEnquiryModel.findByIdAndUpdate(id, values);
export const deleteStudentEnquiryById = (id: string) => StudentEnquiryModel.findByIdAndDelete({ _id: id });
