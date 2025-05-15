import { useRankingFeed } from "@/lib/hooks/useRankingFeed";
import { PeriodType, Pref } from "@/type";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { useState } from "react";

interface Props {
  prefs: Pref[];
}
export default function Trends({prefs}: Props) {
    const [periodType, setPeriodType] = useState<PeriodType>("daily");
    const [activePref, setActivePref] = useState("");

    const { trends, isLoading } = useRankingFeed(periodType, activePref); 
    return (
        <div>
            <ToggleGroup 
                options = {[{value:'daily',label:'日次'},{value:'weekly',label:'週間'}]}
            ></ToggleGroup>
            <ToggleGroup
                options={prefs.map(p=>({value:`${p.type}:${p.id}`,label:p.label}))}
                value={pref}
                onChange={setPref}
            />
        </div>
    );
}