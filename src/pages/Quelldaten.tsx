import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dataSources = [
  { bundesland: "Baden-Württemberg", text: "© LGL, www.lgl-bw.de", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Bayern", text: "© Bayerische Vermessungsverwaltung – www.geodaten.bayern.de", year: 2025, license: "CC BY-ND 4.0" },
  { bundesland: "Berlin", text: "© SenStadt Berlin", year: 2025, license: "dl-de/zero-2.0" },
  { bundesland: "Brandenburg", text: "© GeoBasis-DE/LGB, dl-de/by-2.0", year: 2024, license: "dl-de/by-2.0" },
  { bundesland: "Bremen", text: "© Landesamt GeoInformation Bremen", year: 2025, license: "CC BY 4.0" },
  { bundesland: "Hamburg", text: "© Freie und Hansestadt Hamburg, Landesbetrieb Geoinformation und Vermessung (LGV)", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Hessen", text: "© HVBG", year: 2025, license: "dl-de/zero-2.0" },
  { bundesland: "Mecklenburg-Vorpommern", text: "© GeoBasis-DE/M-V 2025", year: 2025, license: "CC BY 4.0" },
  { bundesland: "Niedersachsen", text: "© LGLN (2025)", year: 2025, license: "CC BY 4.0" },
  { bundesland: "Nordrhein-Westfalen", text: "© Geobasis NRW", year: 2025, license: "dl-de/zero-2.0" },
  { bundesland: "Rheinland-Pfalz", text: "© GeoBasis-DE / LVermGeoRP 2025, dl-de/by-2.0, www.lvermgeo.rlp.de", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Saarland", text: "© GeoBasis DE/LVGL-SL (2025)", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Sachsen", text: "© Geodaten Sachsen", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Sachsen-Anhalt", text: "© GeoBasis-DE / LVermGeo LSA", year: 2025, license: "dl-de/by-2.0" },
  { bundesland: "Schleswig-Holstein", text: "© GeoBasis-DE/LVermGeo SH/CC BY 4.0", year: 2025, license: "CC BY 4.0" },
  { bundesland: "Thüringen", text: "© GDI-Th (2024)", year: 2024, license: "dl-de/by-2.0" },
];

const Quelldaten = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold mb-6">Quelldaten & Datenquellen</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Datengrundlage</h2>
          <p className="text-muted-foreground mb-4">
            Die Lagepläne werden auf Basis von ALKIS-Daten (Amtliches Liegenschaftskatasterinformationssystem) 
            der jeweiligen Bundesländer erstellt. Diese Geodaten sind öffentlich verfügbar und werden gemäß 
            der Datenlizenz Deutschland 2.0 bzw. Creative Commons Lizenzen bereitgestellt.
          </p>
          <p className="text-muted-foreground mb-4">
            Die nachfolgende Tabelle gibt einen Überblick über die verwendeten Datenquellen, 
            den jeweiligen Quellenvermerk sowie die geltende Lizenz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Datenquellen-Verzeichnis</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Bundesland</TableHead>
                  <TableHead className="font-semibold">Quellenvermerk</TableHead>
                  <TableHead className="font-semibold text-center">Jahr</TableHead>
                  <TableHead className="font-semibold">Lizenz</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map((source) => (
                  <TableRow key={source.bundesland}>
                    <TableCell className="font-medium">{source.bundesland}</TableCell>
                    <TableCell className="text-sm">{source.text}</TableCell>
                    <TableCell className="text-center">{source.year}</TableCell>
                    <TableCell className="text-sm">{source.license}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Lizenzinformationen</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">Datenlizenz Deutschland 2.0 (dl-de/by-2.0)</h3>
              <p className="text-sm">
                Ermöglicht die freie Nutzung unter Nennung des Quellenvermerks. 
                Weitere Informationen: <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.govdata.de/dl-de/by-2-0</a>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Datenlizenz Deutschland Zero 2.0 (dl-de/zero-2.0)</h3>
              <p className="text-sm">
                Ermöglicht die uneingeschränkte Nutzung ohne Quellennennung. 
                Weitere Informationen: <a href="https://www.govdata.de/dl-de/zero-2-0" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.govdata.de/dl-de/zero-2-0</a>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Creative Commons (CC BY 4.0 / CC BY-ND 4.0)</h3>
              <p className="text-sm">
                Internationale Standardlizenzen für offene Daten. 
                Weitere Informationen: <a href="https://creativecommons.org/licenses/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">creativecommons.org</a>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Hinweis</h2>
          <p className="text-muted-foreground">
            Die Daten werden von den Vermessungsverwaltungen der Bundesländer bereitgestellt. 
            Wir übernehmen keine Gewähr für die Vollständigkeit, Richtigkeit und Aktualität der Geodaten. 
            Die erstellten Lagepläne ersetzen keine amtlichen Vermessungsunterlagen.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">Stand: Dezember 2025</p>
      </main>
      <Footer />
    </div>
  );
};

export default Quelldaten;
