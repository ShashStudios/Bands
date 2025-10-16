import { Waitlist } from "@/components/waitlist";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <div className="text-xl text-black space-y-6">
          <p className="font-bold text-2xl mb-6">F*CK Shopify, Etsy, Gumroad, all that</p>
          
          <p>
            OpenAI just launched the Agentic Commerce Protocol (ACP).<br />
            It lets anyone sell products or services directly inside ChatGPT.
          </p>
          
          <p>
            But this requires coding,<br />
            And trust me you don't want to code
          </p>
          
          <p>
            Most people don&apos;t know where to start.<br />
            We make it simple.
          </p>
          
          <p>
            You plug in a product.<br />
            We handle everything else.<br />
            You get an AI-native storefront inside ChatGPT.
          </p>
          
          <p>
            No code. No stress.<br />
            Sell in minutes, not weeks.
          </p>
        </div>
        
        <div className="mt-12">
          <Waitlist />
        </div>
      </div>
    </div>
  );
}
