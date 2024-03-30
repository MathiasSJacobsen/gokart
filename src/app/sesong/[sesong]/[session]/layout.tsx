export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lg:m-20 lg:mt-10 m-5">{children}</div>;
}
