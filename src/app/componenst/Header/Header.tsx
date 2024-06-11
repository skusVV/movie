interface IHeaderProps {
    searchTerm: string;
    setSearchTerm: (query: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: IHeaderProps) {

    return (
        <header className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </header>
    );
}

