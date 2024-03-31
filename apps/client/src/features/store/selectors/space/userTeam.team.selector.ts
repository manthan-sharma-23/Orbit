import { selector } from "recoil";
import { teamAtom } from "../../atoms/team/team.atom";
import { userAtom } from "../../atoms/user.atom";

export const userTeamForTeam = selector({
  key: "user/team/selector",
  get: ({ get }) => {
    const { user } = get(userAtom);
    const team = get(teamAtom);

    if (team === null || !user?.id) return null;

    const userTeam = team.members.find((member) => member.userId === user.id);

    console.log(userTeam);

    return userTeam || null;
  },
});
