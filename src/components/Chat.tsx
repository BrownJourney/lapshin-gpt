import Chatbox from "./Chatbox"
import GuidedPromt from "./GuidedPromt"

export default function Chat() {
    return (
      <div className="flex flex-col items-center justify-between h-screen p-10 z-2">
        <div className="flex flex-col">

        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase opacity-50 font-medium">recommended promts</span>

            <div className="flex flex-row gap-2">
              <GuidedPromt text="General information" />
              <GuidedPromt text="Projects" />
              <GuidedPromt text="Achievements" />
            </div>
          </div>

          <Chatbox />

          <span className="text-sm text-center font-normal opacity-50">LapshinGPT can’t make mistakes. All information is correct</span>
        </div>
      </div>
    )
}