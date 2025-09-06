"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { AdminData } from "@/app/lib/admindata";

export default function ChatPage() {
  const params = useParams();
  const userId = parseInt(params.userid as string);

  // Console এ সব information print করি
  console.log("=== FULL DEBUG INFO ===");
  console.log("1. URL params:", params);
  console.log("2. Raw userid:", params.userid);
  console.log("3. Parsed userId:", userId);
  console.log("4. AdminData object:", AdminData);
  
  if (AdminData) {
    console.log("5. AdminData keys:", Object.keys(AdminData));
    console.log("6. Has conversations?", 'conversations' in AdminData);
    console.log("7. Conversations:", AdminData.conversations);
    if (AdminData.conversations) {
      console.log("8. Conversations length:", AdminData.conversations.length);
      console.log("9. First conversation:", AdminData.conversations[0]);
      console.log("10. Available user_ids:", AdminData.conversations.map(c => c.user_id));
    }
  }

  const { conversations = [] } = (AdminData ?? { conversations: [] });

  const currentConversation = useMemo(() => {
    if (!conversations || conversations.length === 0) {
      console.log("❌ No conversations array found");
      return null;
    }
    
    const found = conversations.find((conv) => conv.user_id === userId);
    console.log("11. Looking for userId:", userId, "Type:", typeof userId);
    console.log("12. Found conversation:", found);
    
    // Extra debug - check if type mismatch issue
    const foundByString = conversations.find((conv) => conv.user_id.toString() === params.userid);
    console.log("13. Found by string match:", foundByString);
    
    return found || foundByString;
  }, [conversations, userId, params.userid]);

  // Show all debug info on the page
  return (
    <div className="h-full p-8 bg-white overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-red-600">🐛 Debug Information</h1>
        
        <div className="grid gap-4">
          {/* URL Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">URL Information:</h3>
            <p>Raw params: {JSON.stringify(params)}</p>
            <p>Raw userid: {params.userid} (type: {typeof params.userid})</p>
            <p>Parsed userId: {userId} (type: {typeof userId})</p>
          </div>

          {/* AdminData Info */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">AdminData Information:</h3>
            <p>AdminData exists: {AdminData ? "✅ Yes" : "❌ No"}</p>
            {AdminData && (
              <>
                <p>Keys: {Object.keys(AdminData).join(", ")}</p>
                <p>Has conversations: {'conversations' in AdminData ? "✅ Yes" : "❌ No"}</p>
              </>
            )}
          </div>

          {/* Conversations Info */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Conversations Information:</h3>
            <p>Conversations array length: {conversations?.length || 0}</p>
            {conversations && conversations.length > 0 && (
              <>
                <p>Available User IDs: {conversations.map(c => c.user_id).join(", ")}</p>
                <p>First conversation: {conversations[0]?.customer_name}</p>
              </>
            )}
          </div>

          {/* Search Result */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Search Result:</h3>
            <p>Current conversation found: {currentConversation ? "✅ Yes" : "❌ No"}</p>
            {currentConversation && (
              <p>Found: {currentConversation.customer_name} (ID: {currentConversation.user_id})</p>
            )}
          </div>

          {/* Raw Data Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800">Raw AdminData:</h3>
            <pre className="text-xs overflow-auto max-h-96 bg-white p-2 rounded border">
              {JSON.stringify(AdminData, null, 2)}
            </pre>
          </div>

          {/* Conversation Data */}
          {currentConversation && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">✅ Found Conversation:</h3>
              <pre className="text-xs overflow-auto max-h-48 bg-white p-2 rounded border mt-2">
                {JSON.stringify(currentConversation, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => window.location.href = '/admin/messages'}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go to Messages Home
          </button>
          
          {conversations && conversations.length > 0 && (
            <button 
              onClick={() => window.location.href = `/admin/messages/${conversations[0].user_id}`}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Go to First Conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}