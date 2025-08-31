import jsPDF from "jspdf";
import { format } from "date-fns";
import { StudentEnquiry } from "../hooks/useStudentEnquiry";

// Define types for the PDF configuration
interface PDFConfig {
    logo?: string;
    companyName?: string;
    companyAddress?: string;
    companyContact?: string;
}

interface PDFSection {
    title: string;
    content: string[];
}

class PDFGenerator {
    private config: PDFConfig;

    constructor(config: PDFConfig = {}) {
        this.config = {
            companyName: "Munemi Global",
            companyAddress: "123 Business Street, City, Country",
            companyContact: "info@munemiglobal.com | +1234567890",
            ...config
        };
    }

    async generateStudentEnquiryPDF(enquiry: StudentEnquiry, logoUrl?: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const generate = async () => {
                try {
                    const pdf = new jsPDF('p', 'mm', 'a4');

                    await this.setupDocument(pdf, enquiry, logoUrl);
                    this.addContent(pdf, enquiry);

                    const pdfBlob = pdf.output('blob');
                    resolve(pdfBlob);
                } catch (error) {
                    reject(error);
                }
            };
            generate();
        });
    }

    private async setupDocument(pdf: jsPDF, enquiry: StudentEnquiry, logoUrl?: string): Promise<number> {
        const margin = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();
        let yPosition = 20;

        // Add logo if provided
        if (logoUrl) {
            try {
                // Load logo image and get its dimensions
                const img = new Image();
                img.src = logoUrl;

                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if logo fails to load
                });

                if (img.width && img.height) {
                    // Calculate logo dimensions maintaining aspect ratio
                    const maxLogoWidth = 40;
                    const maxLogoHeight = 30;

                    let logoWidth = img.width;
                    let logoHeight = img.height;

                    // Scale down if too large
                    if (logoWidth > maxLogoWidth) {
                        const ratio = maxLogoWidth / logoWidth;
                        logoWidth = maxLogoWidth;
                        logoHeight = logoHeight * ratio;
                    }

                    if (logoHeight > maxLogoHeight) {
                        const ratio = maxLogoHeight / logoHeight;
                        logoHeight = maxLogoHeight;
                        logoWidth = logoWidth * ratio;
                    }

                    pdf.addImage(logoUrl, 'PNG', margin, yPosition, logoWidth, logoHeight);
                }
            } catch (error) {
                console.warn('Could not load logo image:', error);
            }
        }

        // Company info
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.config.companyName!, pageWidth - margin, yPosition + 10, { align: 'right' });

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(this.config.companyAddress!, pageWidth - margin, yPosition + 16, { align: 'right' });
        pdf.text(this.config.companyContact!, pageWidth - margin, yPosition + 22, { align: 'right' });

        // Document title
        yPosition += 40;
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('STUDENT ENQUIRY REPORT', pageWidth / 2, yPosition, { align: 'center' });

        yPosition += 10;
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Enquiry ID: ${enquiry.id}`, pageWidth / 2, yPosition, { align: 'center' });

        yPosition += 15;
        this.drawHorizontalLine(pdf, yPosition);

        return yPosition + 5;
    }

    private addContent(pdf: jsPDF, enquiry: StudentEnquiry) {
        const margin = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yPosition = 80;
        const lineHeight = 7;
        const maxWidth = pageWidth - (margin * 2);

        // Helper function to add text with wrapping and page breaks
        const addText = (text: string, y: number, isBold = false, fontSize = 10) => {
            if (y > pageHeight - 20) {
                pdf.addPage();
                y = 20;
            }

            pdf.setFontSize(fontSize);
            if (isBold) {
                pdf.setFont('helvetica', 'bold');
            } else {
                pdf.setFont('helvetica', 'normal');
            }

            const lines = pdf.splitTextToSize(text, maxWidth);
            pdf.text(lines, margin, y);

            return lines.length * lineHeight;
        };

        // Helper function to add section
        const addSection = (title: string, content: string[]) => {
            // Add section title
            yPosition += addText(title, yPosition, true, 12) + 3;

            // Add section content
            content.forEach(line => {
                yPosition += addText(line, yPosition, false, 10) + 1;
            });

            yPosition += 5;
            this.drawHorizontalLine(pdf, yPosition, 0.5, '#cccccc');
            yPosition += 8;
        };

        // Safe access function for nested objects
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const safeGet = (obj: any, key: string, defaultValue: any = 'Not provided') => {
            return obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== ''
                ? obj[key]
                : defaultValue;
        };

        // Define all sections
        const sections: PDFSection[] = [
            {
                title: '📋 PERSONAL INFORMATION',
                content: [
                    `Given Name: ${enquiry.givenName}`,
                    `Surname: ${enquiry.surName}`,
                    `Gender: ${safeGet(enquiry, 'gender')}`,
                    `Current Occupation: ${enquiry.currentOccupation}`,
                    `Date of Birth: ${enquiry.dateOfBirth ? format(new Date(enquiry.dateOfBirth), 'MMMM dd, yyyy') : 'Not provided'}`,
                    `National ID: ${enquiry.nidNumber}`,
                    `Email: ${enquiry.email}`,
                    `Phone: ${enquiry.phone}`
                ]
            },
            {
                title: '👨‍👩‍👧‍👦 FAMILY DETAILS',
                content: [
                    `Father's Name: ${enquiry.fathersName}`,
                    `Father's NID: ${enquiry.fathersNid}`,
                    `Father's Phone: ${safeGet(enquiry, 'fathersPhone')}`,
                    `Mother's Name: ${enquiry.mothersName}`,
                    `Mother's NID: ${enquiry.mothersNid}`,
                    `Mother's Phone: ${safeGet(enquiry, 'mothersPhone')}`,
                    `Spouse Name: ${safeGet(enquiry, 'spouseName')}`,
                    `Spouse NID: ${safeGet(enquiry, 'spouseNid')}`,
                    `Spouse Phone: ${safeGet(enquiry, 'spousePhone')}`,
                    `Number of Children: ${safeGet(enquiry, 'numberOfChildren', 'None')}`
                ]
            },
            {
                title: '🌍 VISA & PASSPORT INFORMATION',
                content: [
                    `Visa Type: ${safeGet(enquiry, 'visaType')}`,
                    `Visa Expiry Date: ${enquiry.visaExpiryDate ? format(new Date(enquiry.visaExpiryDate), 'MMMM dd, yyyy') : 'Not provided'}`,
                    `Passport Country: ${safeGet(enquiry, 'passportCountry')}`,
                    `Has Previous Passport: ${enquiry.hasPreviousPassport ? 'Yes' : 'No'}`,
                    `Previous Passport Numbers: ${enquiry.previousPassportNumbers?.join(', ') || 'None'}`
                ]
            },
            {
                title: '🎓 EDUCATION BACKGROUND',
                content: enquiry.educationBackground && enquiry.educationBackground.length > 0 ?
                    enquiry.educationBackground.flatMap((edu, index) => [
                        `--- Education ${index + 1} ---`,
                        `Institution: ${edu.institution}`,
                        `Degree: ${edu.degree}`,
                        `Field of Study: ${edu.fieldOfStudy}`,
                        `Year Completed: ${edu.yearCompleted}`,
                        `Grades: ${edu.grades}`
                    ]) : ['No education background provided']
            },
            {
                title: '📊 INTERESTED SERVICES',
                content: enquiry.interestedServices && enquiry.interestedServices.length > 0 ?
                    enquiry.interestedServices : ['No services selected']
            },
            {
                title: '📞 EMERGENCY CONTACT',
                content: enquiry.emergencyContact ? [
                    `Name: ${safeGet(enquiry.emergencyContact, 'name')}`,
                    `Relationship: ${safeGet(enquiry.emergencyContact, 'relationship')}`,
                    `Phone: ${safeGet(enquiry.emergencyContact, 'phone')}`,
                    `Email: ${safeGet(enquiry.emergencyContact, 'email')}`,
                    `Address: ${safeGet(enquiry.emergencyContact, 'address')}`
                ] : ['No emergency contact provided']
            },
            {
                title: '🏠 ADDRESSES',
                content: enquiry.addresses && enquiry.addresses.length > 0 ?
                    enquiry.addresses.flatMap((address, index) => [
                        `--- Address ${index + 1} (${address.addressType}) ---`,
                        `Street: ${address.street}`,
                        `City: ${address.city}`,
                        `State: ${address.state}`,
                        `Zip Code: ${address.zipCode}`,
                        `Country: ${address.country}`
                    ]) : ['No addresses provided']
            },
            {
                title: '📝 TEST SCORES',
                content: enquiry.englishTestScores ? [
                    `Test Type: ${safeGet(enquiry.englishTestScores, 'testType')}`,
                    `Overall Score: ${safeGet(enquiry.englishTestScores, 'overallScore')}`,
                    `Reading: ${safeGet(enquiry.englishTestScores, 'reading')}`,
                    `Writing: ${safeGet(enquiry.englishTestScores, 'writing')}`,
                    `Listening: ${safeGet(enquiry.englishTestScores, 'listening')}`,
                    `Speaking: ${safeGet(enquiry.englishTestScores, 'speaking')}`,
                    `Test Date: ${safeGet(enquiry.englishTestScores, 'testDate')}`
                ] : ['No test scores provided']
            },
            {
                title: '🔍 PASSPORT DETAILS',
                content: enquiry.passportDetails ? [
                    `Passport Number: ${safeGet(enquiry.passportDetails, 'passportNumber')}`,
                    `Issue Date: ${safeGet(enquiry.passportDetails, 'issueDate')}`,
                    `Expiry Date: ${safeGet(enquiry.passportDetails, 'expiryDate')}`,
                    `Issue Authority: ${safeGet(enquiry.passportDetails, 'issueAuthority')}`
                ] : ['No passport details provided']
            },
            {
                title: '⚠️ VISA REFUSAL HISTORY',
                content: enquiry.visaRefusalDetails ? [
                    `Has Refusal History: ${safeGet(enquiry.visaRefusalDetails, 'hasRefusalHistory') ? 'Yes' : 'No'}`,
                    `Country: ${safeGet(enquiry.visaRefusalDetails, 'country')}`,
                    `Reason: ${safeGet(enquiry.visaRefusalDetails, 'reason')}`,
                    `Date of Refusal: ${safeGet(enquiry.visaRefusalDetails, 'dateOfRefusal')}`,
                    `Applied Again: ${safeGet(enquiry.visaRefusalDetails, 'appliedForVisaAgain')}`
                ] : ['No visa refusal history provided']
            }
        ];

        // Add all sections
        sections.forEach(section => {
            addSection(section.title, section.content);
        });

        // Add system information at the end
        yPosition += addText('⚙️ SYSTEM INFORMATION', yPosition, true, 12) + 3;
        yPosition += addText(`Created: ${format(new Date(enquiry.createdAt), 'MMMM dd, yyyy HH:mm')}`, yPosition) + 1;
        yPosition += addText(`Last Updated: ${format(new Date(enquiry.updatedAt), 'MMMM dd, yyyy HH:mm')}`, yPosition) + 1;
        yPosition += addText(`Enquiry ID: ${enquiry.id}`, yPosition) + 1;
        yPosition += addText(`Agent ID: ${enquiry.agentId}`, yPosition) + 1;

        // Add footer
        this.addFooter(pdf, pageHeight);
    }

    private drawHorizontalLine(pdf: jsPDF, yPosition: number, lineWidth = 1, color = '#000000') {
        const margin = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();

        pdf.setDrawColor(color);
        pdf.setLineWidth(lineWidth);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        pdf.setDrawColor('#000000'); // Reset to black
        pdf.setLineWidth(0.2); // Reset line width
    }

    private addFooter(pdf: jsPDF, pageHeight: number) {
        const pageWidth = pdf.internal.pageSize.getWidth();

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(100, 100, 100);

        const footerText = `Generated by ${this.config.companyName} on ${format(new Date(), 'MMMM dd, yyyy HH:mm')} - Confidential Document`;
        pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

        // Reset text color
        pdf.setTextColor(0, 0, 0);
    }

    async downloadStudentEnquiryPDF(enquiry: StudentEnquiry, logoUrl?: string): Promise<void> {
        try {
            const pdfBlob = await this.generateStudentEnquiryPDF(enquiry, logoUrl);
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Student_Enquiry_${enquiry.givenName}_${enquiry.surName}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error('Failed to generate PDF');
        }
    }
}

// Create a default instance
const pdfGenerator = new PDFGenerator();

export { PDFGenerator, pdfGenerator };