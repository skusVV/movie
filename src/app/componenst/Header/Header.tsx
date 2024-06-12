import { useRouter } from 'next/navigation';

interface IHeaderProps {
    searchTerm: string;
    setSearchTerm: (query: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: IHeaderProps) {
    const router = useRouter();

    return (
        <header className="bg-gray-900 p-4 shadow-md flex items-center">
            <h1 className="ml-4 text-xl font-bold text-cyan-50 cursor-pointer" onClick={() => router.replace('/')}>M</h1>
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

