import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";

export default function SplashScreen() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-mosque text-black text-3xl"></i>
        </div>
        <h1 className="text-white text-2xl font-semibold">Barakah</h1>
        <p className="text-white text-sm mt-2">Shariah Compliant Investment</p>
      </div>
      
      <div className="absolute bottom-20 left-0 right-0 px-8">
        <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
          <SelectTrigger className="w-full bg-white text-black font-medium border-black">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ur">اردو</SelectItem>
            <SelectItem value="hi">हिंदी</SelectItem>
            <SelectItem value="ta">தமிழ்</SelectItem>
            <SelectItem value="te">తెলుగు</SelectItem>
            <SelectItem value="bn">বাংলা</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
