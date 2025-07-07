export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
};

export const truncateText = (text: string, lines: number = 3) => {
    return text.split('\n').slice(0, lines).join('\n') + (text.split('\n').length > lines ? '...' : '');
};

export const slugify = (str: string): string => {
    return str
        .toLowerCase()                   // Convert to lowercase
        .trim()                         // Remove whitespace from both ends
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars (alphanumeric and hyphen)
        .replace(/--+/g, '-')           // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
};