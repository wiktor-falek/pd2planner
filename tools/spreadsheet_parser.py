def parse_entry(entry: str, slot: str, quality: str):
    data = entry.split("\t")
    [name, _, _, lvl_req, str_req, min, max, soc, *_] = data

    if soc:
        return f'\t"{name}": createItemBase("{name}", "{slot}", "{quality}", {{ maxSockets: {soc}, basemods: [baseDefenseModifier([{min}, {max}])] }}),'

    return f'\t"{name}": createItemBase("{name}", "{slot}", "{quality}", {{ basemods: [baseDefenseModifier([{min}, {max}])] }}),'


def parse_data(data: str, slot: str, quality: str) -> None:
    entries = data.split("\n")[1:-1]
    for entry in entries:
        print(parse_entry(entry, slot, quality))


entries = """
Wyrmhide Boots	ulb	60	45	50	54	62		87.5		12
Scarabshell Boots	uvb	66	49	91	56	65		90		14
Boneweave Boots	umb	72	54	118	59	67		102.5		16
Mirrored Boots	utb	81	60	163	59	68		108		18
Myrmidon Greaves	uhb	85	65	208	62	71		119		24
"""

parse_data(entries, "boots", "elite")
