import { useDashboard } from "@/app/hooks/dashboard";
import { Button } from "@/components/ui/button";


export default function ViewPackage() {
    const {setActive} = useDashboard();


  return (
    <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl text-black font-semibold" >Available Packages</h1>
        <div className="flex gap-1">
        <Button
          className="mx-8 my-4"
          variant="secondary"
          onClick={() => setActive("create-package")}
        >
          Create Package
        </Button>
      </div>
    </div>
  )
}

