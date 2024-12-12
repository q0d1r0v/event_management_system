const setupAssociations = (db) => {
  if (db.User && db.Profile && db.Registration && db.Comment && db.Event) {
    db.Event.hasMany(db.Comment, { foreignKey: "event_id", as: "comments" });
    db.Comment.belongsTo(db.Event, { foreignKey: "event_id", as: "event" });
    db.Comment.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });

    db.Registration.belongsTo(db.Event, {
      foreignKey: "event_id",
      as: "event",
    });
    db.Registration.belongsTo(db.User, {
      foreignKey: "user_id",
      as: "user",
    });
    db.User.hasOne(db.Profile, { foreignKey: "user_id", as: "profile" });
    db.Profile.belongsTo(db.User, { foreignKey: "user_id", as: "user" });
  } else {
    console.error("User or Profile model is undefined");
  }
};

module.exports = { setupAssociations };
