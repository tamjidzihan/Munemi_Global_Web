interface PackageDetailsProps {
    details?: string
    termsAndConditions?: string
}
export const PackageDetails = ({ details, termsAndConditions }: PackageDetailsProps) => {
    return (
        <div className="space-y-6 text-gray-700">
            {/* Render HTML content for details */}
            {details && (
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: details }}
                />
            )}

            {/* Render HTML content for terms */}
            {termsAndConditions && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: termsAndConditions }}
                    />
                </div>
            )}
        </div>
    )
}
