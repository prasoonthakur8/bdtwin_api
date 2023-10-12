import Role from "../models/Role.js";

const createRoles = async () => {
  try {
    const existingRoles = await Role.findOne({ role: 'admin' });

    if (!existingRoles) {
      const roles = ['admin', 'super_agent', 'agent', 'player'];

      for (let i = 0; i < roles.length; i++) {
        let newRole = new Role({
          role: roles[i]
        });
        await newRole.save();
      }

      console.log('Roles created successfuley!')
    } else {
      console.log('Roles already exists.');
    }
  } catch (error) {
    console.error(error);
  }
};

export default createRoles;
