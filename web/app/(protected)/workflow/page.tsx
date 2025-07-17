import NodeBoard from "@/components/Workflow/NodeBoard";

const WorkFlow = () => {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem]  uppercase absolute inset-0 top-50 -z-10 text-neutral-400/20  text-center">
          Create your Workflow
        </h1>
        <div className="overflow-hidden">
          <NodeBoard />
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
