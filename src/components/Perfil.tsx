import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/perfil.scss";

type Perfil = {
  namePerfil: string | undefined;
  avatarURLPerfil: string | undefined;
};

export function Perfil({ avatarURLPerfil, namePerfil }: Perfil) {
  const history = useHistory();
  const [isDropDownCreated, setDropDownCreated] = useState(false);
  const { user, signOut } = useAuth();

  function handleCreateDropMenu() {
    setDropDownCreated(true);
  }

  function handleDeleteDropMenu() {
    setDropDownCreated(false);
  }

  function handleLogoutAccount() {
    signOut();
    history.push("/");
  }

  return (
    <div
      className="user-perfil"
      onMouseEnter={handleCreateDropMenu}
      onMouseLeave={handleDeleteDropMenu}
    >
      <img src={avatarURLPerfil} alt={namePerfil} />
      <button
        onClick={handleLogoutAccount}
        className={!isDropDownCreated ? "disabled" : ""}
      >
        Logout
      </button>
    </div>
  );
}
