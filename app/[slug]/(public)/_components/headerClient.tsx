import AppointmentsDrawer from "./appointmentsDrawer/appointmentsDrawer";
import { ModeToggle } from "@/components/modeToggle";
import ProfileDropdown from "@/components/blocks/dropdown-profile";
import { ConfigTime } from "./appointmentsDrawer/types/configTime";
import getBarbers from "@/services/getBarbers";

const HeaderClient = async ({ slug, configTime }: { slug: string, configTime: ConfigTime }) => {
  const data = await getBarbers(slug);

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="gap-4">
          <p>logo</p>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <AppointmentsDrawer configTime={configTime} barbers={data} />
          <ProfileDropdown showLoginFallback />
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
