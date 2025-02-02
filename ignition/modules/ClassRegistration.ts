// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ClassRegistrationModule = buildModule("ClassRegistrationModule", (m) => {

  const ClassRegistration = m.contract("ClassRegistration", [] );

  return { ClassRegistration };
});

export default ClassRegistrationModule;
