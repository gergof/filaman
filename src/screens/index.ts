import AddMaterial from './AddMaterial/AddMaterial';
import AddPrinter from './AddPrinter/AddPrinter';
import AddSpool from './AddSpool/AddSpool';
import EditMaterial from './EditMaterial/EditMaterial';
import EditPrinter from './EditPrinter/EditPrinter';
import EditSpool from './EditSpool/EditSpool';
import MaterialDetails from './MaterialDetails/MaterialDetails';
import Materials from './Materials/Materials';
import PrinterDetails from './PrinterDetails/PrinterDetails';
import Printers from './Printers/Printers';
import SpoolDetails from './SpoolDetails/SpoolDetails';
import Spools from './Spools/Spools';
import Welcome from './Welcome';

export const WelcomeScreen = Welcome;

// materials
export const MaterialsScreen = Materials;
export const MaterialDetailsScreen = MaterialDetails;
export const AddMaterialScreen = AddMaterial;
export const EditMaterialScreen = EditMaterial;

// spools
export const SpoolsScreen = Spools;
export const SpoolDetailsScreen = SpoolDetails;
export const AddSpoolScreen = AddSpool;
export const EditSpoolScreen = EditSpool;

// printers
export const PrintersScreen = Printers;
export const PrinterDetailsScreen = PrinterDetails;
export const AddPrinterScreen = AddPrinter;
export const EditPrinterScreen = EditPrinter;
