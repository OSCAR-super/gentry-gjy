var sqlMap = {
  selectUser: 'INSERT into ? ( ? ) values ( ? )',
  addTable:'INSERT into ? ( ? ) values ( ? )',
  creatTable:'CREATE TABLE ? ( ? )',
  insertTable:'INSERT INTO ? VALUES ( ? ) ',
  deleteTable:'DELETE FROM ? WHERE id = ?',
  add:'INSERT into tb_master ( ? ) values ( ? )',
}

module.exports = sqlMap;
