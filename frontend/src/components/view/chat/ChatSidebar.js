import React from "react";

export default function ChatSidebar({ online }) {
  return (
    <div className="w-2/5 border-l-2">
      <div className="flex flex-col">
        <div className="font-semibold py-2 text-2xl text-center border-b-2 bg-gray-200">
          Chat Statistics
        </div>
        <div className="p-2">
          <div className="font-semibold">
            <li>
              Users online: <span className="text-green-600">{online}</span>
            </li>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t-2">
        <div className="font-semibold py-2 text-2xl text-center border-b-2 bg-gray-200">
          Chat Panel
        </div>
        <div className="p-2">
          <div className="font-semibold">
            <li>...</li>
          </div>
        </div>
      </div>
    </div>
  );
}
