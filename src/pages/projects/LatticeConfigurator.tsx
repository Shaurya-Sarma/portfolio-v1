import NavigationBar from "../../components/NavigationBar";
import ProjectHero from "../../components/ProjectHero";
import { Project } from "../../helpers/constants";

const LatticeConfigurator: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#fcfaf4] min-h-screen w-full">
      <NavigationBar />

      {/* Project Breakdown */}
      <main className="max-w-screen-lg mx-auto pt-32 px-8 relative">
        <ProjectHero project={project} />

        {/* Custom Content */}
        <div className="pb-10 breakdown">
          <h5>Breakdown</h5>
          <p>
            During a 10-week summer research internship at RWTH Aachen
            University in Germany, I worked with a team of researchers at the{" "}
            <a
              href=" https://dap-aachen.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Additive Production
            </a>{" "}
            (DAP) Laboratory to build an XR Lattice Configurator. Under the
            supervision of Dr. Gustavo Melo, Henrik Kruse, and Kilyan Talhouet,
            I contributed to the design and development of an interactive tool
            for configuring lattice structures in extended reality environments
            utilizing the{" "}
            <a
              href="https://www.senseglove.com/product/nova-2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SenseGlove Nova 2
            </a>{" "}
            haptic gloves.{" "}
          </p>
          <iframe
            className="w-full h-[60vh] my-5 rounded-sm shadow-md"
            src="https://www.youtube.com/embed/CAlzd_PJDq4?si=iio7Pt3B7XoStGaq"
            title="XR Lattice Configurator Demo"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <h5>Report</h5>
          <p>
            The document below summarizes the research goals, technical
            approach, and key findings from this project, emphasizing the
            potential of immersive technology in real-world applications. A
            concise poster version of this report was presented at a symposium
            held at RWTH Aachen University, where several other students,
            professors, and academic advisors attended and viewed this project.
          </p>
          <iframe
            className="w-full h-[90vh] my-5 rounded-sm shadow-md"
            src="/documents/UROP International Report - Shaurya Sarma.pdf"
            title="XR Lattice Configurator Report"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
          <h5>Conclusion</h5>
          <p>
            Working on this project exposed me to topics beyond the scope of my
            experience in the United States. It was a unique opportunity to
            collaborate with international researchers while also learning about
            the field of additive manufacturing (AM) and potential XR
            applications. Alongside my work, I also passed an A1 German course,
            which strengthened my communication and foreign language skills in a
            professional context. I believe this experience would provide a
            solid foundation for any future research or work opportunities
            abroad.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LatticeConfigurator;
