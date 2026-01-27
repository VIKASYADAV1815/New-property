export const metadata = {
  title: "Explore | Property Search",
};

export default function ExploreLayout({ children }) {
  return (
    <main className="bg-white">
      <div className="border-t border-gray-200" />
      {children}
    </main>
  );
}

