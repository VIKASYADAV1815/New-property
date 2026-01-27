export const metadata = {
  title: "Community | Property Search",
};

export default function CommunityLayout({ children }) {
  return (
    <main className="bg-white">
      <div className="border-t border-gray-200" />
      {children}
    </main>
  );
}

