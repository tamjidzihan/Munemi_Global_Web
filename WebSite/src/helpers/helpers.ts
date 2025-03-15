export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
};

export const truncateText = (text: string, lines: number = 3) => {
    return text.split('\n').slice(0, lines).join('\n') + (text.split('\n').length > lines ? '...' : '');
};
