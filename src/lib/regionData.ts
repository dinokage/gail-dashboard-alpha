export type StationType = 'IP' | 'SV' | 'CGS' | 'RT' | 'CT' | 'DT' | 'TOP';
export type JunctionType = 'TOP' | 'PUPL' | 'HTPL' | 'DPPL' | 'KPPL' | 'ATPL' | 'TEE POINT';

interface Station {
  name: string;
  code: string;
  type: StationType;
}

interface Junction {
  name: string;
  code: string;
  type: JunctionType;
  pipeSize?: string;
}

interface RegionData {
  stations: Station[];
  pipelineJunctions: Junction[];
}

export const regions: Record<string, RegionData> = {
    TARAPUR: {
        stations: [
            { code: "", name: "IP-3 Apti Bhudruk", type: "IP" },
            { code: "", name: "SV-15 Kharivali", type: "SV" },
            { code: "", name: "SV-1 Chillaraphata", type: "SV" },
            { code: "", name: "CGS Tarapur", type: "CGS" },
            { code: "", name: "RT Tata Wiron", type: "RT" },
            { code: "", name: "RT JSW", type: "RT" },
            { code: "", name: "RT Viraj 1", type: "RT" },
            { code: "", name: "RT Viraj 2&3", type: "RT" },
            { code: "", name: "RT Viraj 4&5", type: "RT" },
            { code: "104.01.11", name: "RT TATA CRC", type: "RT" }
        ],
        pipelineJunctions: [
            { 
                code: "10401403",
                name: "T POINT (8IN CONNECTIVITY SPURLINE_TARAPUR)-JSW_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401301",
                name: "ATPL_IP-3 Apti Budruk - CGS Tarapur_10 IN",
                type: "ATPL",
                pipeSize: "10 IN"
            },
            { 
                code: "10401501",
                name: "CGS Tarapur - Viraj 1_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401302",
                name: "T POINT (ATPL) - Viraj 4 & 5_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401402",
                name: "T POINT (8 IN CONNECTIVITY SPURLINE_TARAPUR)- VIRAJ 2&3_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401404",
                name: "T POINT (8IN CONNECTIVITY SPURLINE)- TATA WIRON_4  IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401405",
                name: "T POINT (8IN CONNECTIVITY SPURLINE)- TATA CRC_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10401401",
                name: "CGS TARAPUR-CONNECTIVITY SPURLINE)_8 IN",
                type: "TOP",
                pipeSize: "8 IN"
            }
        ]
    },
    DUPL_BELAPUR: {
        stations: [
            { code: "104.01.02", name: "SV-17 Lap Budruk", type: "SV" },
            { code: "104.01.03", name: "SV-18 Mhashkal", type: "SV" },
            { code: "104.01.04", name: "SV-19 Chikloli", type: "SV" },
            { code: "104.01.05", name: "SV-20 Hazimalangwadi", type: "SV" },
            { code: "104.01.06", name: "IP-4 Borle", type: "IP" },
            { code: "104.01.07", name: "SV-22 Jasai", type: "SV" },
            { code: "104.01.08", name: "SV-23 Ghoteghar", type: "SV" },
            { code: "104.01.09", name: "CT-Mahagenco RLNG Uran", type: "CT" },
            { code: "104.01.10", name: "CT-MGL Taloja", type: "CT" },
            { code: "104.01.11", name: "CT-NRC Kalyan", type: "CT" },
            { code: "104.01.12", name: "CT-NPL Kalyan", type: "CT" },
            { code: "104.01.13", name: "CT-MGL Ambernath", type: "CT" },
            { code: "104.01.14", name: "RT-DFPCL Taloja", type: "RT" },
            { code: "104.01.15", name: "CT-Asahi Glass Taloja", type: "CT" },
            { code: "104.01.16", name: "CT-JSW Wasind", type: "CT" },
            { code: "104.01.17", name: "CT-VVF Taloja", type: "CT" },
            { code: "104.01.18", name: "RT_OWENS CORNING TALOJA", type: "RT" },
            { code: "104.01.19", name: "RT_PCL TALOJA", type: "RT" },
            { code: "104.01.20", name: "RT_HCL TALOJA", type: "RT" },
            { code: "104.01.21", name: "DT_UTPL (ONGC)", type: "DT" },
            { code: "104.01.22", name: "SV1_UTPL (ONGC)", type: "SV" },
            { code: "104.01.71", name: "TOP_JSW", type: "TOP" },
            { code: "104.01.72", name: "TOP_19 VVF", type: "TOP" },
            { code: "104.01.73", name: "TOP_ASAHI", type: "TOP" }
        ],
        pipelineJunctions: [
            { 
                code: "10400104",
                name: "DUPL SV16 to IP4",
                type: "TOP"
            },
            { 
                code: "10403701",
                name: "TOP( FROM DUPL 30 IN M/L) - JSW WASIND_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10403101",
                name: "SV-18 MASHKAL - NPL KALYAN_6 IN",
                type: "TOP",
                pipeSize: "6 IN"
            },
            { 
                code: "10403201",
                name: "NPL KALYAN - NRC KALYAN_6 IN",
                type: "TOP",
                pipeSize: "6 IN"
            },
            { 
                code: "10403301",
                name: "SV19 - MGL Ambarnath_8 IN",
                type: "TOP",
                pipeSize: "8 IN"
            },
            { 
                code: "10401201",
                name: "HTPL SV20 to SV23",
                type: "HTPL"
            },
            { 
                code: "10403401",
                name: "SV20 to DFPCL",
                type: "TOP"
            },
            { 
                code: "10403501",
                name: "TOP19 (SV20 TO DFPCL) - VVF_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10403801",
                name: "VVF-OWENS CORNING_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10403403",
                name: "DFPCL- HCL Taloja_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10403404",
                name: "HCL- PCL Taloja_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "10403405",
                name: "DFPCL - PCL Taloja_12 IN",
                type: "TOP",
                pipeSize: "12 IN"
            },
            { 
                code: "10403402",
                name: "DFPCL - MGL Taloja_8 IN",
                type: "TOP",
                pipeSize: "8 IN"
            },
            { 
                code: "10403601",
                name: "TOP (SV20 TO DFPCL) - ASHAI GLASS",
                type: "TOP"
            },
            { 
                code: "10401101",
                name: "PUPL IP4 to MAHAGENCO",
                type: "PUPL"
            }
        ]
    },
    TROMBAY: {
        stations: [
            { code: "SV-24L", name: "SV-24L Vashi", type: "SV" },
            { code: "SV-24R", name: "SV-24R Mahape", type: "SV" },
            { code: "SV-25", name: "SV-25 Mankhurd", type: "SV" },
            { code: "RCF", name: "RCF Trombay", type: "CT" },
            { code: "SV-2", name: "SV-2 RCF Trombay", type: "SV" },
            { code: "RT-MGL", name: "RT MGL Mahape", type: "RT" },
            { code: "BPCL-RLNG", name: "BPCL RLNG Trombay", type: "CT" },
            { code: "BPCL-APM", name: "BPCL APM SV-1 Trombay", type: "CT" },
            { code: "HPCL-RLNG", name: "HPCL RLNG", type: "CT" },
            { code: "MGL-WADALA", name: "MGL WADALA", type: "CT" },
            { code: "UNIMERS", name: "UNIMERS Turbhe", type: "CT" },
            { code: "TPC-RLNG", name: "TPC RLNG Trombay", type: "CT" },
            { code: "TPC-APM", name: "TPC APM Trombay", type: "CT" },
            { code: "TOP-20", name: "TOP-20 Turbhe", type: "TOP" }
        ],
        pipelineJunctions: [
            { 
                code: "SV24R-MGL",
                name: "SV-24R TO MGL Mahape",
                type: "TOP"
            },
            { 
                code: "TOP20-UMMERS",
                name: "TOP-20 HTPL - UMMERS_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "UMMERS-SIG",
                name: "UMMERS - SIG_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "RCF-BPCL",
                name: "RCF Trombay - BPCL_18 IN",
                type: "TOP",
                pipeSize: "18 IN"
            },
            { 
                code: "TEE-BPCL-TPC",
                name: "TEE POINT (BPCL-TPC) - HPCL_12 IN",
                type: "TEE POINT",
                pipeSize: "12 IN"
            },
            { 
                code: "BPCL-TPC",
                name: "BPCL - TPC",
                type: "TOP"
            },
            { 
                code: "TRPL-RCF",
                name: "TRPL-TROMBAY- RCF_18 IN",
                type: "TOP",
                pipeSize: "18 IN"
            },
            { 
                code: "TMPL-MGL",
                name: "TMPL-TROMBAY-MGL WADALA_18 IN",
                type: "TOP",
                pipeSize: "18 IN"
            }
        ]
    },
    DPPL_BELAPUR: {
        stations: [
            { code: "TOP-23", name: "TOP-23 Lodhiwal", type: "TOP" },
            { code: "SV-1", name: "SV-1 Savroli", type: "SV" },
            { code: "IP-1", name: "IP-1 Kargaon", type: "IP" },
            { code: "SV-2", name: "SV-2 Bharje", type: "SV" },
            { code: "RT-HIL", name: "RT HIL", type: "RT" },
            { code: "RT-HI-TECH", name: "RT HI-TECH CARBON", type: "RT" },
            { code: "RT-BOMBAY", name: "RT BOMBAY DYEING", type: "RT" },
            { code: "RT-RAMA", name: "RT RAMA PETROCHEMICALS", type: "RT" },
            { code: "RT-HOCL", name: "RT HOCL", type: "RT" },
            { code: "RT-TATA", name: "RT TATA STEEL", type: "RT" },
            { code: "RT-UTTAM-PALI", name: "RT UTTAM STEEL PALI", type: "RT" },
            { code: "RT-UTTAM-DONAVAT", name: "RT UTTAM DONAVAT", type: "RT" },
            { code: "RT-PARLE", name: "RT PARLE BISCUITS", type: "RT" },
            { code: "RT-RELIANCE", name: "RT RELIANCE PATALGANGA", type: "RT" },
            { code: "RT-ACCIL", name: "RT ACCIL", type: "RT" },
            { code: "RT-MSSSPL", name: "RT MSSSPL", type: "RT" },
            { code: "RT-MGL", name: "RT MGL SAVROLI", type: "RT" },
            { code: "TAP-OFF", name: "TAP-OFF (RIL Patalganga)- Valve Pit", type: "TOP" }
        ],
        pipelineJunctions: [
            { 
                code: "TOP23-RELIANCE",
                name: "TOP -23 LODHIWALI-RELIANCE PATALGANGA_12 IN",
                type: "TOP",
                pipeSize: "12 IN"
            },
            { 
                code: "TOP23-BOMBAY",
                name: "TOP (TOP-23 TO RELIANCE PATALGANGA)- BOMBAY DYEING_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "TOP23-RAMA",
                name: "TOP (TOP-23 TO RELIANCE PATALGANGA)- RAMA PETRO_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "RAMA-HI-TECH",
                name: "RAMA PETRO- HI TECH CARBON",
                type: "TOP"
            },
            { 
                code: "BOMBAY-HOCL",
                name: "BOMBAY DYEING-HOCL_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "HOCL-HIL",
                name: "HOCL-HIL_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "SV1-TATA",
                name: "SV1-TATA STEEL_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "TATA-MSSSPL",
                name: "TATA STEEL- MSSSPL_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "SV1-UTTAM-PALI",
                name: "SV-1 UTTAM STEEL PALI_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "TOP-ACCIL",
                name: "TOP( SV-1 TO UTTAM DONAVAT) - ACCIL_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "TOP-PARLE",
                name: "TOP( SV-1 TO UTTAM DONAVAT ) - PARLE BISCUITS_4 IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "TOP-MGL",
                name: "TOP (SV-1 SAVROLI, DPPL) - MGL CGD, RAIGARH",
                type: "TOP"
            },
            { 
                code: "TEE-UTTAM-DONAVAT",
                name: "TEE POINT (SV-1 -UTTAM PALI) - UTTAM DONAVAT_4 IN",
                type: "TEE POINT",
                pipeSize: "4 IN"
            },
            { 
                code: "DPPL-IP4-IP1",
                name: "DPPL_IP4 BORLE IP-1 KARGAON_30IN",
                type: "DPPL",
                pipeSize: "30 IN"
            }
        ]
    },
    THAL_MANGAON: {
        stations: [
            { code: "THAL-MANGAON", name: "THAL-MANGAON", type: "TOP" }
        ],
        pipelineJunctions: [
            { code: "THAL-MANGAON", name: "THAL-MANGAON", type: "TOP" }
        ]
    },
    PUNE: {
        stations: [
            { code: "SV-10", name: "SV-10 Kusgaon", type: "SV" },
            { code: "SV-11", name: "SV-11 Wadivali", type: "SV" },
            { code: "CGS", name: "CGS Talegaon", type: "CGS" },
            { code: "SV-12", name: "SV-12 NANOLI", type: "SV" },
            { code: "RT-PUNE", name: "RT PUNE", type: "RT" },
            { code: "RT-TATA", name: "RT TATA MOTORS Gas Terminal", type: "RT" },
            { code: "RT-Century", name: "RT Century ENKA Gas Terminal", type: "RT" }
        ],
        pipelineJunctions: [
            { 
                code: "KPPL-KARGAON-PUNE",
                name: "KPPL_KARGAON-PUNE _30_IN",
                type: "KPPL",
                pipeSize: "30 IN"
            },
            { 
                code: "TOP-MNGL",
                name: "TOP(FROM KPPL)-MNGL TALEGAON_4IN",
                type: "TOP",
                pipeSize: "4 IN"
            },
            { 
                code: "RT-Pune-TATA",
                name: "RT Pune - TATA Motors",
                type: "TOP"
            },
            { 
                code: "TEE-RT-Pune-TATA",
                name: "TEE POINT(RT Pune-TATA MOTORS)- Century ENKA",
                type: "TEE POINT"
            }
        ]
    },
    DHABOL: {
        stations: [
            { code: "DT-DABHOL", name: "DT-DABHOL", type: "DT" },
            { code: "SV-4", name: "SV-4 Khudukkhurd", type: "SV" },
            { code: "SV-5", name: "SV-5 Hatip", type: "SV" },
            { code: "SV-6", name: "SV-6 Jalgaon", type: "SV" },
            { code: "SV-7", name: "SV-7 Vinoshi", type: "SV" }
        ],
        pipelineJunctions: [
            { 
                code: "DPPL-IP2-RT-DABHOL",
                name: "DPPL_IP2 USARGHAR-RT DABHOL",
                type: "DPPL"
            },
            { 
                code: "Dabhol-Patgaon",
                name: "Dabhol DT - Patgaon  IP-1",
                type: "TOP"
            }
        ]
    }
}