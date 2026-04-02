import getConfig from "@/services/getConfig";
import FormConfigAppointment from "./_components/formConfigAppointment";

const ConfigPage = async () => {
  const data = await getConfig();

  if (!data) return null;

  return <FormConfigAppointment data={data} />;
};

export default ConfigPage;
