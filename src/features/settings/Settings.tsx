import Heading from "../../core/ui/Heading";
import Row from "../../core/ui/Row";
import UpdateSettingsForm from "./components/UpdateSettingsForm";

function Settings() {
  return (
    <Row type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
