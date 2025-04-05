def parse_entry(entry: str, slot: str, quality: str):
    # data = entry.split("\t")
    # [name, _, _, lvl_req, str_req, min, max, soc, *_] = data

    # if soc:
    #     return f'\t"{name}": createItemBase("{name}", "{slot}", "{quality}", {{ maxSockets: {soc}, basemods: [baseDefenseModifier([{min}, {max}])] }}),'

    # return f'\t"{name}": createItemBase("{name}", "{slot}", "{quality}", {{ basemods: [baseDefenseModifier([{min}, {max}])] }}),'
    data = entry.split("\t")
    [name, _, _, lvl_req, str_req, min, max, soc, *_] = data

    base = f'\t"{name}": createItemBase("{name}", "{slot}", "{quality}", {{'
    mods = f"basemods: [baseDefenseModifier([{min}, {max}])]"
    sockets = f"maxSockets: {soc}, " if soc else ""

    reqs = []
    if int(str_req) > 0:
        reqs.append(f"strength: {str_req}")
    if int(lvl_req) > 0:
        reqs.append(f"level: {lvl_req}")
    requirements = f", requirements: {{ {', '.join(reqs)} }}" if reqs else ""

    return f"{base} {sockets}{mods}{requirements} }}),"


def parse_data(data: str, slot: str, quality: str) -> None:
    entries = data.split("\n")[1:-1]
    for entry in entries:
        print(parse_entry(entry, slot, quality))


entries = """
Spiderweb Sash	ulc	61	46	50	55	62				12
Vampirefang Belt	uvc	68	51	50	56	63				14
Mithril Coil	umc	75	56	106	58	65				16
Troll Belt	utc	82	62	151	59	66				18
Colossus Girdle	uhc	85	67	185	61	71				24
"""

parse_data(entries, "belt", "elite")
