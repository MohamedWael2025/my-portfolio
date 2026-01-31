import type { Metadata } from "next"
import CppToolsApp from "./components/cpp-tools-app"

export const metadata: Metadata = {
  title: "C++ Developer Tools Hub | Mohamed Wael",
  description: "Collection of C++ developer tools including code formatter, linter, and performance analyzer",
}

export default function CppToolsPage() {
  return <CppToolsApp />
}
